async function gql(query, variables={}) {
    const data = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return data.json();
}


const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int) {
        user(username: "cifer628") {
            publication {
                posts(page: $page) {
                    coverImage
                    title
                    slug
                }
            }
        }
    }
`;
console.table(gql(GET_USER_ARTICLES,{page:0}))

gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        const articles = result.data.user.publication.posts;
        let aLimit = articles.slice(0,6);
        let container = document.createElement('div');
        container.className = "blog-container backdrop-grid";
        aLimit.forEach(article => {
            let eBlogContainer = document.createElement('div');
            eBlogContainer.className = "blog-img-container";
            let image = document.createElement('img');
            image.src = article.coverImage;
            image.className = "blog-img";

            /*
            let title = document.createElement('h2');
            title.innerText = article.title;
            title.className = "blog-title";
            */

           /* let brief = document.createElement('p');
            brief.innerText = article.brief;
            brief.className = "blog-brief";
            */
            let link = document.createElement('a');
            link.innerText = article.title;
            link.href = `https://cifer628.hashnode.dev/${article.slug}`;
            link.className = "blog-link";

            eBlogContainer.appendChild(image);
            /*eBlogContainer.appendChild(title);*/
           // eBlogContainer.appendChild(brief);
            eBlogContainer.appendChild(link);
            container.appendChild(eBlogContainer);
        });

        document.querySelector('.blog').appendChild(container);
});