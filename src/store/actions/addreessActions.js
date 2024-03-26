import { useEffect, useState } from 'react';
import useAxiosWrapper, { promiseWrapper } from '../../http/useAxiosWrapper';
import { ADDRESS_URL } from '../../constants/api';

const useAddressActions = () => {
  const api = useAxiosWrapper();

  const getOneAsync = (addressId) => {
    const [adddress, setAddress] = useState(null);

    useEffect(() => {
      const loadAddress = async () => {
        let promise;
        if (!addressId) {
          promise = new Promise((resolve) => { resolve(null); });
        } else {
          promise = api.get(`${ADDRESS_URL}/${addressId}`).then(({ data: { data } }) => data);
        }

        setAddress(promiseWrapper(promise));
      };

      loadAddress();
    }, [addressId]);

    return adddress;
  };

  return {
    getOneAsync,
  };
};

export default useAddressActions;
