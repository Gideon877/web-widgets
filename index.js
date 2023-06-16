document.addEventListener('alpine:init', () => {
    Alpine.data('widgets', () => ({
        init() {
            console.log('I can initialize', this.count)
        },

        header: 'Web widgets',

        counter: {
            count: 0,
            add() {
                this.count++;
                this.getState()
            },
            substract() {
                this.count--;
                this.getState()
            },

            getState() {
                const border = 'card border-', cardHeader = 'card-header bg-transparent border-', cardBody = 'card-body text-';

                if (this.count > 0) {
                    this.border = border + 'success'
                    this.cardHeader = cardHeader + 'success';
                    this.cardBody = cardBody + 'success';

                }
                else if (this.count === 0) {
                    this.border = border + 'primary'
                    this.cardHeader = cardHeader + 'primary';
                    this.cardBody = cardBody + 'primary';

                }
                else {
                    this.border = border + 'danger'
                    this.cardHeader = cardHeader + 'danger';
                    this.cardBody = cardBody + 'danger';
                }

            },

            border: 'card border-primary',
            cardHeader: 'card-header bg-transparent border-primary',
            cardBody: 'card-body text-primary',


        },


        word: 'chess',
        results: [],
        isLoading: false,
        async search() {
            if (this.word.trim() !== '') {
                this.isLoading = true;
                const apiResults = await this.fetchUrbanDictionaryDefinition(this.word.trim());
                this.results = apiResults.list;
                console.log(this.results)
                this.isLoading = false;
            }
        },

        playAudio(url) {
            if (url) {
                const audio = new Audio(url);
                audio.play();
            }
        },

        async fetchUrbanDictionaryDefinition(term) {
            const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${term}`;
            const headers = {
                'X-RapidAPI-Key': '4fd36d59eemshcf1fd0423eacb4ap169092jsncfd075a3b336',
                'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
            };

            return fetch(url, {
                method: 'GET',
                headers: headers
            })
                .then(response => response.json())
                .catch(error => {
                    console.error(error);
                });
        }

    }))
})


