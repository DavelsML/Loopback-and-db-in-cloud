import {AddressRepository, FriendRepository} from '../../repositories';
import {FriendController} from '../../controllers';
import {DbDataSource} from '../../datasources/db.datasource';
import {expect} from '@loopback/testlab';
import {Friend} from '../../models';

describe('Friends Integration tests', () => {
  const db = new DbDataSource();
  let frendRepository: FriendRepository;
  const addressRepository = new AddressRepository(db, async () => frendRepository);
  frendRepository = new FriendRepository(db, async () => addressRepository);
  const controller = new FriendController(frendRepository);

  it('Get friend by id 1 from database', async () => {
    const friend = await controller.create(new Friend({
        firstname: 'John',
        lastname: 'Doe',
      }),
    );

    if (friend.id === undefined) {
      throw new Error('Friend not found.');
    }

    const result = await controller.findById(friend.id);

    expect(result.firstname).equal('John');
    expect(result.lastname).equal('Doe');
  });
});
