export const currencyFormatterEntryFee = (prize: string | any) => {
  if (parseInt(prize.toString()) == 0) {
    return 'Free';
  }
  return (
    <>
      <span className="price-sign-wrap">$</span>
      {prize.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
    </>
  );
};