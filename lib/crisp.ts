import { Crisp } from 'crisp-sdk-web';
import { Subscription } from 'models/subscription';
import { User } from 'models/user';

export const load = () => {
  Crisp.configure(process.env.NEXT_PUBLIC_WEBSITE_ID!);
};

export const configureUser = (user: User, subscripttion: Subscription) => {
  Crisp.user.setEmail(user.email);
  Crisp.user.setNickname(user.name);

  Crisp.session.setData({
    plan: subscripttion.product.name,
  });
};
