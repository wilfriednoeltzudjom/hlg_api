const HttpResponse = require('../application/payloads/http-response');

const buildCreateAccountUseCase = require('../use_cases/accounts/create-account');
const buildSignInUseCase = require('../use_cases/accounts/sign-in');
const buildSignOutUseCase = require('../use_cases/accounts/sign-out');
const buildGetProfile = require('../use_cases/accounts/get-profile');

module.exports = function buildAccountController(dependencies) {
  const createAccountUseCase = buildCreateAccountUseCase(dependencies);
  const signInUseCase = buildSignInUseCase(dependencies);
  const signOutUseCase = buildSignOutUseCase(dependencies);
  const getProfileUseCase = buildGetProfile(dependencies);

  async function createAccount(request) {
    const account = await createAccountUseCase.execute(request.body);

    return HttpResponse.created({
      message: 'Your account has been successfully created',
      data: account.toJSON(),
    });
  }

  async function signIn(request) {
    const signResponse = await signInUseCase.execute(request.body);

    return HttpResponse.succeeded({
      message: 'You have been successfully logged in',
      data: signResponse,
    });
  }

  async function signOut(request) {
    const session = await signOutUseCase.execute({ session: request.session });

    return HttpResponse.succeeded({
      message: 'You have been successfully logged out',
      data: session,
    });
  }

  async function getProfile(request) {
    const profile = await getProfileUseCase.execute({ user: request.user });

    return HttpResponse.succeeded({
      data: profile,
    });
  }

  return {
    createAccount,
    signIn,
    signOut,
    getProfile,
  };
};
