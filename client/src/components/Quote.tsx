import FormatQuoteOutlinedIcon from '@mui/icons-material/FormatQuoteOutlined';

interface Props{
    quote: string,
    credit: string
}
export default function Quote({quote, credit}: Props){
    return(
        <div className="quote-wrapper">
            <div className="quote">
            <FormatQuoteOutlinedIcon />
                <h2>{quote}</h2>
            <FormatQuoteOutlinedIcon />
            </div>
            <div className="credit">
                <h5>~ {credit}</h5>
            </div>
        </div>
    )
}