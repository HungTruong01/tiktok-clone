import { useEffect, useState } from "react";

const tabs = ['posts', 'comments', 'albums'];

function Content() {
    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState('posts');
    const [show, setShow] = useState(false);

    console.log(type);
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(posts => {
                setPosts(posts)
            })
    }, [type])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setShow(true);
            }
            else {
                setShow(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
    }, [])

    return (
        <div>
            {tabs.map(tab => (
                <button
                    key={tab}
                    style={type === tab ? {
                        color: '#fff',
                        background: '#333'
                    } : {}}
                    onClick={() => setType(tab)}
                >
                    {tab}
                </button>
            ))}

            <input value={title} onChange={e => setTitle(e.target.value)}></input>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            {show && (
                <button
                    style={{
                        position: 'fixed',
                        right: 20,
                        bottom: 20
                    }}
                >
                    Go to top
                </button>
            )}
        </div>
    )
}

export default Content;