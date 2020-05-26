class LiveStream {

    /**
     * 
     */
    constructor() {
        this.moreWork = true;
    }
    /**
     * 
     * @param suggestedProjects 
     */
    run(suggestedProjects) {
        while (!moreWork && suggestedProjects.length > 0) {
            let workinOn = suggestedProjects.pop();
            this.execute(workinOn.TwoMinuteJavascriptTutorials);
            this.execute(workinOn.FifteenMinuteJavascriptTutorials);
            this.execute(workinOn.OneHourGameChallenge);
        }
    }

    /**
     * 
     * @param project 
     */
    execute(project) {

    }
}