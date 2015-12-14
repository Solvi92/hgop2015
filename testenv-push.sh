#!/bin/bash

ssh vagrant@$1 -p $2 "\
	docker pull solvih13/tictactoe; \
	docker stop ttt; \
	docker rm ttt; \
	docker run -p $3:8080 -d --name ttt -e \"NODE_ENV=production\" solvih13/tictactoe; "