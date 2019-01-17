import { fromEvents } from "kefir";
import m, { route, RouteDefs, Vnode } from "mithril";
import { compose, map } from "ramda";
import { Character, newCharacter } from './MekWarrior4/interfaces/characters';
import { fastXP, slowXP, standardXP } from './MekWarrior4/interfaces/skills';

// #region Testing
const character = newCharacter();
const xp1 = standardXP;
const xp2 = slowXP;
const xp3 = fastXP;
// #endregion

// #region Interfaces
interface Route {
  name: string;
  path: string;
}

interface RouteSettings {
  routes: Route[];
  defaultRoute: string;
}

interface RouteModel {
  routes: Route[];
  defaultRoute: string;
  routeName: string;
  params: object;
}

interface State {
  routing: RouteModel;
  value: number;
  text: string;
}
// #endregion

// #region Initial
const element = document.body;
const EVENT_NAME = "user:event";
const eventValue = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;

  return target.value;
};
const getSettings = (): RouteSettings => {
  const routes: Route[] = [
    { name: "root", path: "/" },
    { name: "secondary", path: "/foo" },
  ];
  const defaultRoute = routes[0].path;

  return {
    routes,
    defaultRoute,
  };
};
const settings = getSettings();
const initialState: State = {
  routing: {
    routes: settings.routes.slice(),
    defaultRoute: settings.defaultRoute,
    routeName: settings.defaultRoute,
    params: undefined,
  },
  value: 20,
  text: "",
};
// #endregion

// #region Actions
/**
 * A collection of action identifiers
 */
enum ActionID {
  TEMP_INCREASE = "temp:increase",
  TEXT_CHANGE   = "text:change",
  ROUTE_CHANGE  = "route:change",
}

const dispatchAction = (name: ActionID) => (value: any) => {
  const event = new CustomEvent(EVENT_NAME, { detail: { name, value } });
  document.body.dispatchEvent(event);
};

const increase = dispatchAction(ActionID.TEMP_INCREASE);
const newText = dispatchAction(ActionID.TEXT_CHANGE);
const routeChange = dispatchAction(ActionID.ROUTE_CHANGE);

const withEventValue = (action: any) => compose(action, eventValue);
// #endregion

// #region view
const Nav = {
  view: ({ attrs }: Vnode<RouteModel>) => m(
    'nav',
    { style: 'margin-bottom: 10px' },
    map(
      (r) => m(
        'a',
        {
          href: r.path,
          oncreate: route.link,
          style: 'margin: 0 5px',
        },
        r.name
      ),
      attrs.routes
    )
  ),
};

const Main = {
  view: ({ attrs }: Vnode<State>) =>
    m('#main', [
      m('span', { style: 'display: block' }, `Temp: ${attrs.value}`),
      m('span', { style: 'display: block' }, `Text: ${attrs.text}`),
      m(
        'button',
        {
          onclick: () => { increase(1); },
          style: 'display: block',
        },
        'increase temp'
      ),
      m('input', {
        type: 'text',
        style: 'display: block',
        placeholder: 'enter something',
        onkeyup: withEventValue(newText),
      }),
    ]),
};

const Alt = {
  view: (_: Vnode<State>) =>
    m('#alt', [
      m('h1', 'this is the alternate page'),
      map((x) => m('p', x), fastXP),
    ]),
};

const whereTo = (attrs: State) => {
  const { routing } = attrs;
  switch (routing.routeName) {
    case '/':
      return m(Main, attrs);
    default:
      return m(Alt, attrs);
  }
};

const Root = {
  view: ({ attrs }: Vnode<State>) =>
    m('#root', [m(Nav, attrs.routing), whereTo(attrs)]),
};
// #endregion

// #region router
const createRouteDefinition = (model: State): RouteDefs => {
  const { routing } = model;

  return routing.routes.reduce((accumulator, r) => {
    accumulator[r.path] = {
      onmatch: (params: any, _: any) => {
        /* NOTE: This gets invoked on every update, don't fire an event to
         * change the route unless it's actually changed, or there will be
         * callstack errors.
         */
        if (model.routing.routeName !== r.path) {
          routeChange({
            routeName: r.path,
            params,
          });
        }
      },
      render: () => {
        return m(Root, model);
      },
    };

    return accumulator;
  },
  {} as { [id: string]: any }
  );
};
// #endregion

// #region reducer
const commandBus = (state: State, command: CustomEvent): State => {
  const { detail } = command;

  switch (detail.name) {
    case ActionID.TEMP_INCREASE:
      state.value += detail.value;

      return state;
    case ActionID.TEXT_CHANGE:
      state.text = detail.value;

      return state;
    case ActionID.ROUTE_CHANGE:
      state.routing.routeName = detail.value.routeName;
      state.routing.defaultRoute = detail.value.params;

      return state;
    default:
      return state;
  }
};
// #endregion

// #region render
const stream = fromEvents(element, EVENT_NAME);
const dispatcher = stream.scan(commandBus, initialState);
const routeDefinitions = createRouteDefinition(initialState);

dispatcher.onValue(state => {
  route(element, state.routing.defaultRoute, routeDefinitions);
});
// #endregion
