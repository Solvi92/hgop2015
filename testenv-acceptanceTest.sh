ssh vagrant@127.0.0.1 -p 2222 "docker restart ttt"
export ACCEPTANCE_URL=http://localhost:9090
grunt mochaTest:acceptance