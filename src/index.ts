import {server} from './core/server';
import {Logger} from './utils/logger';

function main() {
    server.listen(server.get('port'), () => Logger.info(`App is listening at ${server.get('port')}`));
}

main();
