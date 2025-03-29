const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  
  const PrimeCalculator = (limit) => {
    console.log('Calculating primes...');
    const primes = [];
    for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) primes.push(i);
    }
    return primes;
  };
  
  export default PrimeCalculator;
  