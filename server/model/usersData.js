import help from '../helpers/help';

const data = {
  users: [
    {
      id: 1,
      email: 'test@tester.com',
      firstName: 'Adeogo',
      lastName: 'Adejana',
      password: help.hashPassword('Adeogoadejan'),
      homeAddress: 'Victoria island',
      workAddress: 'yaba',
      phoneNumber: '08066256070',
      status: 'verified',
      isAdmin: true,
    },
    {
      id: 2,
      email: 'jimiagbaje@gmail.com',
      firstName: 'jimi',
      lastName: 'agbaje',
      password: help.hashPassword('jimiagbaje'),
      homeAddress: 'lekki',
      workAddress: 'ketu',
      phoneNumber: '08066256070',
      status: 'unverified',
      isAdmin: false,
    },
    {
      id: 3,
      email: 'donaldoduke@gmail.com',
      firstName: 'donaldo',
      lastName: 'duke',
      password: help.hashPassword('donaldoduke'),
      homeAddress: 'yaba',
      workAddress: 'ajah',
      phoneNumber: '08066256070',
      status: 'unverified',
      isAdmin: false,
    },
    {
      id: 4,
      email: 'feladurotoye@gmail.com',
      firstName: 'fela',
      lastName: 'durotoye',
      password: help.hashPassword('feladurotoye'),
      homeAddress: 'yaba',
      workAddress: 'yaba',
      phoneNumber: '08066256070',
      status: 'unverified',
      isAdmin: false,
    },
    {
      id: 5,
      firstName: 'seun',
      lastName: 'oye',
      email: 'seunoye@gmail.com',
      homeAddress: 'surulere',
      workAddress: 'yaba',
      phoneNumber: '08066256070',
      password: help.hashPassword('password'),
      status: 'unverified'
    },
    {
      id: 6,
      firstName: 'cghhgfjv',
      lastName: 'fjdikijoifjfi',
      email: 'jimiagake@gail.com',
      homeAddress: 'surulere',
      workAddress: 'yaba',
      phoneNumber: '08066256070',
      password: 'djfdkdf',
      registered: '2019-05-14T09:47:03+01:00',
      status: 'unverified'
    }
  ],
  payment: [
    {
      id: 1,
      createdOn: '2019-12-04 09:23:23',
      loanId: 2,
      status: 'unapproved',
      recentPayment: 5000,
      paymentMade: 1000,
      pendingAmount: 1000,
      repaidAmount: 2000,
    },
    {
      id: 2,
      createdOn: '2019-12-04 09:23:23',
      loanId: 2,
      status: 'unapproved',
      recentPayment: 5000,
      paymentMade: 1000,
      pendingAmount: 1000,
      repaidAmount: 2000,
    },
    {
      id: 3,
      createdOn: '2019-12-04 09:23:23',
      loanId: 2,
      status: 'approved',
      recentPayment: 5000,
      paymentMade: 1000.00,
      pendingAmount: 1000.00,
      repaidAmount: 2000.00,
    },
    {
      id: 4,
      createdOn: '2019-12-04 09:23:23',
      loanId: 2,
      status: 'approved',
      recentPayment: 5000,
      pendingAmount: 1000.00,
      repaidAmount: 2000.00,
    },
  ],
  loans: [
    {
      id: 1,
      email: 'test@tester.com',
      firstName: 'jimi',
      lastName: 'agbaje',
      tenon: 6,
      paymentInstallament: 12000,
      balance: 40000,
      interest: 13000,
      totalPayment: 40000,
      repaidLoans: 0,
      status: 'pending',
      loanRepaid: false
    },
    {
      id: 2,
      email: 'test@teser.com',
      firstName: 'jimi',
      lastName: 'agbaje',
      tenon: 6,
      paymentInstallament: 12000,
      balance: 40000,
      interest: 13000,
      totalPayment: 40000,
      repaidLoans: 0,
      status: 'approved',
      loanRepaid: false
    },
    {
      id: 3,
      email: 'test@testr.com',
      firstName: 'jimi',
      lastName: 'agbaje',
      tenon: 6,
      paymentInstallament: 12000,
      balance: 40000,
      interest: 1300,
      totalPayment: 40000,
      repaidLoans: 0,
      status: 'pending',
      loanRepaid: false
    },
  ],
};
export default data;
