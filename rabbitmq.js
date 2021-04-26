const amqp    = require('amqplib');

const msg = {number:18};

const amqpServer = "amqps://emjkkpwy:cuAlLeos4tYASa6UUNqGAMoKyXVDL8N5@clam.rmq.cloudamqp.com/emjkkpwy";

const pub = async function publisher(){
    const connection = await amqp.connect(amqpServer);
    const channel    = await connection.createChannel();
    //const result     = await channel.assertQueue('jobs');

    channel.sendToQueue('jobs',Buffer.from(JSON.stringify(msg)));
    console.log(`jobs send successfully ${msg.number}`);

}

const sub = async function subsciber(){
    const connection = await amqp.connect(amqpServer);
    const channel    = await connection.createChannel();
   // const result     = await channel.assertQueue('jobs');

    channel.consume('jobs',message =>{
        console.log('Received : '+message.content.toString())
        channel.ack(message);
    })

    console.log('waiting for messages....');
}

module.exports = {
    'pub':pub, 
    'sub':sub
}