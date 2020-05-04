
const RegisterWin = ({card, organiserCard, closeRegistration, registerScore}) => {

    // Update containing fields
    organiserCard.contains(card).map(i => card.field(i).called());

    return (
        <div>
            <button onClick={registerScore}>BINGO!</button>
            <button onClick={closeRegistration}>Close</button>
        </div>
    );
}

export default RegisterWin;