include ./Makefile.inc

ALL: clean purge prepare docker

.PHONY: ALL \
	purge clean prepare build test killdocker \
	dev-word-add-in-sample \
	docker docker-cloud docker-server \
	deploy-registry \
	escrow

killdocker:
	@docker ps -a | grep "myscriptjs-$(DOCKERTAG)-$(BUILDENV)-" | awk '{print $$1}' | xargs -r docker rm -f 2>/dev/null 1>/dev/null || true

purge:
	@rm -rf word-add-in-sample/MyScript\ Math\ SampleWeb/bower_components/
	@rm -rf word-add-in-sample/MyScript\ Math\ SampleWeb/node_modules/

clean: killdocker
	@rm -Rf dist || exit 1
	@cd word-add-in-sample/MyScript\ Math\ SampleWeb && \
		rm -rf dist

prepare:
	@cd word-add-in-sample/MyScript\ Math\ SampleWeb && \
	    npm install && \
	    bower install

build:
	@rm -Rf dist || exit 1
	@mkdir -p dist/word-add-in-sample
	@cd word-add-in-sample/MyScript\ Math\ SampleWeb && gulp --tag $(GIT_VERSION)
	@cp -R word-add-in-sample/MyScript\ Math\ SampleWeb/dist/* dist/word-add-in-sample
	@cp -R word-add-in-sample/MyScript\ Math\ Sample/MyScript\ Math\ SampleManifest/MyScript\ Math\ Sample.xml dist/word-add-in-sample

docker: build
	@echo "Building docker image for word-add-in-sample"
	@rm -rf docker/officeplugin/delivery || exit 1
	@mkdir -p docker/officeplugin/delivery
	@cp -R dist/* docker/officeplugin/delivery
#	@sed -i "" "s|~remoteAppUrl|"$(PLUGIN_DNS)"|g" docker/officeplugin/delivery/word-add-in-sample/MyScript\ Math\ Sample.xml
	@(cd docker/officeplugin/; docker build $(DOCKER_PARAMETERS) -t $(OFFICEPLUGIN_STATICSERVER_DOCKERREPOSITORY) .)

docs:
	@echo "Task not implemented"

dev-word-add-in-sample:
	@cd  word-add-in-sample/MyScript\ Math\ SampleWeb && gulp serve --tag $(GIT_VERSION)

run-docker:
	@echo "Starting officeplugin container!"
	@docker run -d --name $(TEST_DOCKER_OFFICEPLUGIN_INSTANCE_NAME) $(DOCKER_OFFICEPLUGIN_PARAMETERS) $(OFFICEPLUGIN_STATICSERVER_DOCKERREPOSITORY)
	@docker run --rm --link $(TEST_DOCKER_OFFICEPLUGIN_INSTANCE_NAME):WAITHOST -e "WAIT_PORT=80" -e "WAIT_SERVICE=Office plugin" $(WAITTCP_DOCKERREPOSITORY)

deploy-registry: clean docker
	@docker push $(OFFICEPLUGIN_STATICSERVER_DOCKERREPOSITORY)

s3: docker
	@echo "Uploading word math sample to s3"
	@aws --profile cloud s3 sync  docker/officeplugin/delivery/word-add-in-sample  s3://wordmathsamplecloudfront/  --delete --acl public-read
	@aws --profile cloud configure set preview.cloudfront true
	@aws --profile cloud cloudfront create-invalidation --distribution-id E1EUF7560IKLSF --paths '/*'

_print-vars:
	@echo "$(REGISTRY)"
	@echo "$(OFFICEPLUGIN_STATICSERVER_DOCKERREPOSITORY)"
	@echo "$(TEST_DOCKER_NAME_PREFIX)"
	@echo "$(TEST_DOCKER_OFFICEPLUGIN_INSTANCE_NAME)"
