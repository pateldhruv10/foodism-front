
awscli:
	@./$(SCRIPTS)/awscli
install: 
	@npm install
quasar:
	@npm install -g @quasar/cli
build:
	@quasar build
deploy:
	@aws s3 cp /dist/src/* s3://temp-foodism-stage --acl public-read