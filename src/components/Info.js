import React from 'react'

function Info(props) {
    const { sentence, scrambledSentence, scramble } = props

    return (
        <>
            <div id='scrambled-word'>
                <p>{scrambledSentence}</p>
            </div>
            <button onClick={() => scramble(sentence)}>SCRAMBLE</button>
        </>
    )
}

export default Info
