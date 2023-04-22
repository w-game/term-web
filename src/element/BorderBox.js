import '../css/BorderBox.css'

function BorderBox(params) {
    console.debug(params.children)
    return (
        <div className='border-box'>
            {params.children}
        </div>
    )
}

export default BorderBox;