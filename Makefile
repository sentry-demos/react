# Must have `sentry-cli` installed globally
# Following variable must be passed in
# SENTRY_AUTH_TOKEN
SENTRY_ORG=split-sentry-webinar-testing
SENTRY_PROJECT=split-sentry-webinar-testing
VERSION=`sentry-cli releases propose-version`
PREFIX=static/js

# setup_release: create_release associate_commits upload_sourcemaps
	
setup_release: create_release
create_release:
	sentry-cli releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)

# associate_commits:
# 	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --auto $(VERSION)

# upload_sourcemaps:
# 	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files $(VERSION) \
# 		upload-sourcemaps --url-prefix "~/$(PREFIX)" --validate build/$(PREFIX)
