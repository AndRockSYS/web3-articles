'use client';

import './apply.css';

export default function Apply() {
    const sendMessage = () => {
        const elements = document.querySelectorAll(
            'main.apply > div > input, .apply > div > textarea'
        ) as NodeListOf<HTMLInputElement>;

        for (let el of elements) {
            if (el.value == '') {
                alert('Fill the form');
                return;
            }
        }

        fetch(`${process.env.NEXT_PUBLIC_APP_URL as string}/api/mail`, {
            method: 'POST',
            body: JSON.stringify({
                account: elements[0].value,
                name: elements[1].value,
                message: elements[2].value,
                date: elements[3].value,
            }),
        }).then((response) =>
            alert(response.status == 200 ? 'Message was sent!' : 'Error occured!')
        );
    };

    return (
        <main className='apply'>
            <h1>Application Form for Meeting</h1>
            <div>
                <label htmlFor='twitter'>X Account</label>
                <input type='text' name='twitter' />
            </div>

            <div>
                <label htmlFor='name'>Your Name</label>
                <input type='text' name='name' placeholder='Name' />
            </div>

            <div>
                <label htmlFor='message'>Your message</label>
                <textarea name='message' placeholder='Type your message here' />
            </div>

            <div>
                <label htmlFor='date'>Meeting Date</label>
                <input type='date' name='date' />
            </div>

            <button id='blue-button' onClick={() => sendMessage()}>
                Send
            </button>
        </main>
    );
}
