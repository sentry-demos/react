# Must have `sentry-cli` installed globally
# Following variable must be passed in
# SENTRY_AUTH_TOKEN
SENTRY_ORG=testorg-az
SENTRY_PROJECT=dustin-onboarding-react
VERSION=`sentry-cli releases propose-version`
PREFIX=static/js

REPOSITORY=us.gcr.io/sales-engineering-sf
COMMIT_SHA=$(shell git rev-parse HEAD)
GCP_DEPLOY=gcloud run deploy $(shell whoami)
GCP_SERVICE_NAME=react-errors
GCP_WORKSPACE_NAME=workspace_react_errors


build_react:
	source $(HOME)/.nvm/nvm.sh && nvm use && npm install && npm run build

setup_release: create_release associate_commits upload_sourcemaps

create_release:
	sentry-cli releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)

associate_commits:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --auto $(VERSION)

upload_sourcemaps:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files $(VERSION) \
		upload-sourcemaps --url-prefix "~/$(PREFIX)" --validate build/$(PREFIX)

# GCP
deploy_gcp: build_react setup_release build deploy_react

build:
	gcloud builds submit --substitutions=COMMIT_SHA=$(COMMIT_SHA) --config=cloudbuild.yaml
deploy_react:
	$(GCP_DEPLOY)-$(GCP_SERVICE_NAME) --image $(REPOSITORY)/$(GCP_WORKSPACE_NAME):$(COMMIT_SHA) --platform managed
# ---

.PHONY: all build_react setup_release create_release associate_commits upload_sourcemaps build deploy_react
