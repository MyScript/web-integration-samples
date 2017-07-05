SHELL = /bin/bash
GIT_VERSION := $(shell git describe --tags --long --always)
CURRENT_USER_UID := $(shell id -u)
CURRENT_USER_GID := $(shell id -g)

MAKE := $(MAKE) --no-print-directory
NPM_CACHE = $(HOME)/.npm

FULL = false
OFFLINE = false
APILOCAL = false
DEVLOCAL = false
SELENIUM_HOST = localhost
SELENIUM_ENV = chrome
CURRENT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
PROJECT_DIR ?= $(CURRENT_DIR)
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

DOCKERTAG := master
GIT_TAG = 2.0.0

REGISTRY = registry.visionobjects.com:5000
DOC_DOCKERREPOSITORY = $(REGISTRY)/myscriptjs-docs:$(DOCKERTAG)
OFFICEPLUGIN_STATICSERVER_DOCKERREPOSITORY = $(REGISTRY)/myscript-officeplugin-staticserver:$(DOCKERTAG)

BUILDENV := test
TEST_DOCKER_NAME_PREFIX := myscript-officeplugin-$(DOCKERTAG)-$(BUILDENV)-$(BUILDID)
TEST_DOCKER_OFFICEPLUGIN_INSTANCE_NAME := $(TEST_DOCKER_NAME_PREFIX)-staticserver

CONFIGURATION_DOCKERTAG := master
WAITTCP_DOCKERREPOSITORY = $(REGISTRY)/myscript-webcomponents-wait-tcp:$(CONFIGURATION_DOCKERTAG)


ifeq ($(findstring dev-,$(MAKECMDGOALS)),)
  BUILDID := $(shell date +"%Y-%m-%d_%H_%M_%S_%N")
else
  BUILDID := DEV
endif

DOCKER_PARAMETERS := --pull
DOCKER_OFFICEPLUGIN_PARAMETERS := -p 8080:80
