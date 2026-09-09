import {Client, expect} from '@loopback/testlab';
import {FriendsApplication} from '../..';
import {setupApplication} from './test-helper';
import {Friend} from '../../models';

describe('PingController', () => {
  let app: FriendsApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  it('invokes GET /friends', async () => {
    const res = await client.get('/friends').expect(200);
    expect(res.body.some((friend: Friend) => friend.lastname === 'Ozols')).to.equal(true);
    expect(res.body.some((friend: Friend) => friend.firstname === 'Janis')).to.equal(true);
    expect(res.body.some((friend: Friend) => friend.id === 1)).to.equal(true);
  });

  after(async () => {
    await app.stop();
  });
});
