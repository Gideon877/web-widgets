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


        word: '',
        results: [],

        async search() {
            if (this.word.trim() !== '') {
                this.results = await this.fetchWordDefinition(this.word.trim());
                console.log(this.results[0].meanings[0].definitions.definition);
                this.playAudio(this.results[0]?.phonetics[0]?.audio);
            }
        },

        playAudio(url) {
            if (url) {
                const audio = new Audio(url);
                audio.play();
            }
        },
        fetchWordDefinition(word) {
            return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then(response => response.json())
                .catch(error => {
                    console.error('Error:', error);
                    return [];
                });
        }
    }))
})


