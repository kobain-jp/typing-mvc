(function () {


    const App = {

        init: function () {
            // html elements
            this.untypedElement = document.getElementById('untyped');
            this.typedElement = document.getElementById('typed');

            // model
            this.quotes = [];
            // data for elements
            this.currentQuote = { untyped: "", typed: "" };
            this.typeCount = 0;

            this.correctTypeCount = 0;

            document.addEventListener("keypress", this.solve.bind(this));

            this.loadQuotes(this.nextQuote.bind(this));

        }, solve: function (e) {

            this.typeCount++;

            //keyが正しい場合は
            if (e.key == this.currentQuote.untyped.charAt(0)) {

                this.correctTypeCount++;

                //最後の文字列だったら次の問題
                if (this.currentQuote.untyped.length == 1) {

                    this.nextQuote();

                } else {

                    this.nextCharacter();
                }

            }

        }, nextQuote: function () {

            //問題がなければクリアと表示してリロード
            if (this.quotes.length == 0) {

                this.showScoreAndReload();

            } else {

                const quote = this.quotes.shift();
                this.currentQuote.typed = ""
                this.currentQuote.untyped = quote;

                this.renderQuote();
            }


        }, nextCharacter: function () {

            this.currentQuote.typed = this.currentQuote.typed + this.currentQuote.untyped.substring(0, 1);
            this.currentQuote.untyped = this.currentQuote.untyped.substring(1, this.currentQuote.untyped.length);

            this.renderQuote();

        }, showScoreAndReload: function () {

            const accuracyRate = Math.floor((this.correctTypeCount / this.typeCount) * 100);
            const template = 'Your percentage of correct answers is {{accuracyRate}}%';

            window.alert(template.replace("{{accuracyRate}}", accuracyRate));

            window.location.reload();

        }, loadQuotes: function (callback) {
            this.quotes.push("It means that your future hasn't been written yet.");
            this.quotes.push("No one's has.");
            this.quotes.push("Your future is whatever you make it.");
            this.quotes.push("So make it a good one.");
            this.quotes.push("Both of ya!");

            callback();

        }, renderQuote: function () {
            const escapedTypedText = this.currentQuote.typed.replace(/\s/g, "&nbsp;");
            const escapedUnTypedText = this.currentQuote.untyped.replace(/\s/g, "&nbsp;");

            this.typedElement.innerHTML = escapedTypedText;
            this.untypedElement.innerHTML = escapedUnTypedText;

        }
    }

    App.init();

}());



