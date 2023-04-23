import '../css/BorderBox.css'

function BorderBox(params) {
    return (
        <div className='border-box'>
            {params.children}
        </div>
    )
}

export default BorderBox;