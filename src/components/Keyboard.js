import React from 'react'

function Keyboard(props) {
    const { sentenceArray } = props

    console.log(sentenceArray.word1.length)
    if (sentenceArray.word1.length > 0) {
        return (
            <div>
                {sentenceArray.map(x => {
                    <p>{x}</p>
                })}
            </div>
        )
    } else {
        return <p>hi</p>
    }
}

export default Keyboard
