.PHONY: ci-web-echo web-test names-db-prelude

# Variables ====================================================================
WEB_DIR := client/web
PLUGINS_DIR := plugin

# Prelude ======================================================================
ci-web-echo:
	pwd
	node -v
	npm -v

ci-web-prelude: ci-web-echo web-install

names-db-prelude:
	pwd
	rustc --version
	cargo --version

# Install ======================================================================
web-install:
	cd ${WEB_DIR} && \
	yarn install

# Build ========================================================================
web-build:
	cd ${WEB_DIR} && \
	yarn run build

names-db-build-unoptimized:
	cd ${PLUGINS_DIR}/names_db && \
	cargo build

names-db-build:
	cd ${PLUGINS_DIR}/names_db && \
	cargo build --release

# Lint =========================================================================
web-lint:
	cd ${WEB_DIR} && \
	yarn run lint

# Test =========================================================================
web-test:
	cd ${WEB_DIR} && \
	yarn run test:ci
