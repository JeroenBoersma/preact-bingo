

const peer = new RTCPeerConnection();
const dataChannel = peer.createDataChannel('test', {
    ordered: false,
	maxRetransmitTime: 1000 //milliseconds
});

peer.addEventListener('icecandidate', async (e) => {

    if (! e.candidate) {
        return;
    }

    console.log('icecandidate', e.candidate);
    await peer.addIceCandidate(e.candidate);
});

peer.addEventListener('negotiationneeded', async () => {
    console.log('negotiate');
    const offer = await peer.createOffer();

    peer.setLocalDescription(offer);
});

dataChannel.addEventListener('message', async (...args) => {
    console.log(args);
});

const init = async () => {



    // const offer = await peer.createOffer();
    // await peer.setLocalDescription(offer);

}

init();

export default {};