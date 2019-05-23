import query from './index';

const queryString =  'DROP TABLE IF EXISTS users, loans, repayments CASCADE';

query(queryString);
