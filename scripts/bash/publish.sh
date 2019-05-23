#!/bin/bash

set -e

function build_deploy() {
	if [[ -n "$(git status --porcelain)" ]]; then
		echo "Working tree *NOT* clean. Please stash/commit your changes before any operations."
		exit 1
	fi

	current_branch="$(git symbolic-ref --short -q HEAD)"

	if [[ -n "$(git rev-parse --verify --quiet deploy)" ]]; then
		git branch -D deploy
	fi

	git checkout -b deploy

	git push -f origin deploy:deploy

	git checkout $current_branch

	git branch -D deploy
	
}

build_deploy $@

