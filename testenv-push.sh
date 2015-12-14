#!/bin/bash

ssh vagrant@$1 -p $2 "\
	docker pull solvih13/tictactoe; \
	docker stop ttt$3; \
	docker rm ttt$3; \
	docker run -p $3:8080 -d --name ttt$3 -e \"NODE_ENV=production\" solvih13/tictactoe; "