class starRater extends HTMLElement {
    constructor() {
        super();
        
        this.build();
    }
    
    build() {
        const shadow = this.attachShadow({mode: 'open'});
        const rater = this.createRater();
        
        shadow.appendChild(this.styles());
        
        this.stars = this.createStars();
        this.stars.forEach(star => rater.appendChild(star));
        
        this.resetRating();
        
        shadow.appendChild(rater);
    }
    
    createRater() {
        const rater = document.createElement('div');
        
        rater.classList.add('star-rater');
        rater.addEventListener('mouseout', this.resetRating.bind(this));
        
        return rater;
    }
    
    createStars() {
        const createStar = (_, id) => {
            const star = document.createElement('span');
            
            star.classList.add('star');
            star.setAttribute('data-value', Number(id) + 1);
            star.innerHTML= '&#9733;';
            
            star.addEventListener('click', this.setRating.bind(this));
            star.addEventListener('mouseover', this.ratingHover.bind(this));
            
            return star;
        }
        
        return Array.from({length: 5}, createStar);
    }
    
    resetRating() {
        this.currentRatingValue = this.getAttribute('data-rating') || 0;
        this.highlightRating();
    }
    
    setRating(event) {
        this.setAttribute('data-rating', event.currentTarget.getAttribute('data-value'));
    }
    
    ratingHover(event) {
        this.currentRatingValue = event.currentTarget.getAttribute('data-value');
        this.highlightRating();
    }
    
    highlightRating() {
        this.stars.forEach(star => {
            star.style.color = this.currentRatingValue >= star.getAttribute('data-value') ? 'yellow' : 'gray';
        });
    }
    
    styles() {
        const style = document.createElement('style');
        style.textContent = `
        .star {
            color: gray;
            cursor: pointer;
            font-size: 5rem;
        }`;
        
        return style;
    }
}

customElements.define('star-rater', starRater);