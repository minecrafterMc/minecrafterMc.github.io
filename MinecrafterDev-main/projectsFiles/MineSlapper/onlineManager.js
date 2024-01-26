const remoteStorage = new RemoteStorage();
remoteStorage.connect('minecraftermc@5apps.com');
remoteStorage.access.claim('Mineslapper', 'rw');

const client = remoteStorage.scope('/');
async function getOnline()
{
    await remoteStorage.startSync();
}
async function postOnline()
{
    client.storeObject("MineslapperData", "data", packageData());
}