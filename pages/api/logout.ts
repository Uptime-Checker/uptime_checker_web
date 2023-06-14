import { HttpStatusCode } from 'axios';
import { withSessionRoute } from 'lib/session/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(logout);

function logout(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.status(HttpStatusCode.NoContent).end();
}
