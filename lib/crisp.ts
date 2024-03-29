import { Crisp } from 'crisp-sdk-web';
import { Subscription } from 'models/subscription';
import { User } from 'models/user';

export const load = () => {
  Crisp.configure(process.env.NEXT_PUBLIC_CRSIP_WEBSITE_ID!);
};

export const configureUser = (user: User, subscription: Subscription) => {
  Crisp.user.setEmail(user.Email);
  Crisp.user.setNickname(user.Name);

  Crisp.session.setData({
    plan: subscription.Product.Name,
  });
};
