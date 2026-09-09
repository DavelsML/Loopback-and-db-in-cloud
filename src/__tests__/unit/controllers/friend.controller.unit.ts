import {FriendController} from '../../../controllers';
import {expect, sinon} from '@loopback/testlab';
import {FriendRepository} from '../../../repositories';
import {Friend} from '../../../models';

describe('Friends controller tests', () => {
  const repository = sinon.createStubInstance(FriendRepository);
  const controller = new FriendController(repository);

  it('creates a friend', async () => {
    repository.create.resolves(
      new Friend({
        firstname: 'John',
        lastname: 'Doe',
      }),
    );

    const friend = new Friend({
      firstname: 'John',
      lastname: 'Doe',
    });

    const result = await controller.create(friend);

    sinon.assert.calledOnce(repository.create);
    expect(result.firstname).to.equal('John');
    expect(result.lastname).to.equal('Doe');
  });

  it('updates a friend', async () => {
    repository.updateById.resolves();

    const friend = new Friend({
      firstname: 'John',
      lastname: 'Doe2',
    });

    await controller.updateById(1, friend);

    sinon.assert.calledOnce(repository.updateById);
    sinon.assert.calledWith(repository.updateById, 1, friend);
  });

  it('gets a friend by id', async () => {
    repository.findById.resolves(new Friend({
      firstname: 'John',
      lastname: 'Doe',
    }));

    const result = await controller.findById(1);

    expect(result.firstname).to.equal('John');
    expect(result.lastname).to.equal('Doe');
    sinon.assert.calledOnce(repository.findById);
    sinon.assert.calledWith(repository.findById, 1);
  });

  it('gets a friend by lastname', async () => {
    repository.findByLastname.resolves([new Friend({
      firstname: 'John',
      lastname: 'Doe',
    })]);

    const result = await controller.findByLastName("Doe");

    expect(result?.every(friend => friend.lastname === 'Doe')).to.equal(true);
    sinon.assert.calledOnce(repository.findById);
    sinon.assert.calledWith(repository.findByLastname, 'Doe');
  });
});
