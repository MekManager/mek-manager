.PHONY: ci-web-echo web-test

WEB_DIR := client/www

ci-web-echo:
	pwd
	node -v
	npm -v

ci-web-prelude: ci-web-echo web-install

web-build:
	cd ${WEB_DIR} && \
	yarn run build

web-install:
	cd ${WEB_DIR} && \
	yarn install

web-lint:
	cd ${WEB_DIR} && \
	yarn run lint

web-test:
	cd ${WEB_DIR} && \
	yarn run test:ci
