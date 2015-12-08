#!/bin/bash

docker push solvih13/tictactoe
ssh vagrant@127.0.0.1 -p 2222 "\
	docker pull solvih13/tictactoe; \
	docker stop ttt; \
	docker rm ttt; \
	docker run -p 9000:8080 -d --name ttt -e \"NODE_ENV=production\" solvih13/tictactoe;"