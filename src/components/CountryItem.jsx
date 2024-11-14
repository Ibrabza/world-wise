import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <div className={styles.countryItem} >
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </div>
  );
}

export default CountryItem;
