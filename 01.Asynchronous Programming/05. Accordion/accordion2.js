async function solution() {

    try {
        
        let url = `http://localhost:3030/jsonstore/advanced/articles/list`;
        let response = await fetch(url);

        //console.log(response);

        if (!response.ok == true) {
            throw new Error()
        }


    } catch (error) {
        
    }




    async function moreOnClick(e) {

    }




    

}

solution();