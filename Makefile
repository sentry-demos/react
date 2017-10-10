# Must have `sentry-cli` installed globally
# Following env variables have to be set or passed in:
#  SENTRY_AUTH_TOKEN, HEROKU_AUTH_TOKEN
#  or have it set as environment variable

SENTRY_ORG=testorg-az
SENTRY_PROJECT=sentry-react-demo
HEROKU_APP_ID=sentry-react-demo

VERSION=`sentry-cli releases propose-version`

setup_release: build_app create_release upload_sourcemaps

create_release:
	sentry-cli releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --auto $(VERSION)

build_app:
	REACT_APP_RELEASE=$(VERSION) npm run build

upload_sourcemaps:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files \
		$(VERSION) upload-sourcemaps build/static/js/*.js.map

set_release_context:
	curl -n -X PATCH https://api.heroku.com/apps/$(HEROKU_APP_ID)/config-vars \
		-d "{ \"REACT_APP_RELEASE\":\"$(VERSION)\"}" \
		-H "Content-Type: application/json" \
		-H "Accept: application/vnd.heroku+json; version=3" \
		-H "Authorization: Bearer $(HEROKU_AUTH_TOKEN)"

deploy: setup_release set_release_context
	git push heroku master
