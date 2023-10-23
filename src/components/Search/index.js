import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import hooks from '~/hooks';
import styles from './Search.module.scss';
import icons from '~/assets/icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import config from '~/config';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

export function SearchParkingLot({ className }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = hooks.useAxiosPrivate();

  const searchParkingLot = async (keyword) => {
    const response = await axiosPrivate.get(config.constants.SEARCHING_LOTS_URL + `?keyword=${keyword}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response;
  };

  const debounced = hooks.useDebounce(searchValue, 700);

  const inputRef = useRef();

  useEffect(() => {
    if (!debounced) {
      return;
    }

    setLoading(true);

    const fetchApi = async () => {
      setLoading(true);

      const response = await searchParkingLot(debounced);
      setSearchResult(response?.data?.object || []);
      setLoading(false);
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const handleClear = () => {
    setSearchValue('');
    inputRef?.current?.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  return (
    <div className={cx({ [className]: className })}>
      <HeadlessTippy
        visible={showResult && searchResult.length > 0}
        interactive
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Bãi đỗ xe</h4>
              {searchResult.map((result) => (
                <div key={result.id}>{result.parkingLotName}</div>
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={icons.faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={icons.faSpinner} />}
          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export function SearchParkingLotByMerchantId({ className }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const axiosPrivate = hooks.useAxiosPrivate();
  const [username, _] = hooks.useLocalStorage('user', '');

  const getMerchantIdByUsername = async (username) => {
    const response = await axiosPrivate.post('/api/merchant/information', JSON.stringify({ username }), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response;
  };

  const searchParkingLotByMerchantId = async (keyword, id) => {
    const response = await axiosPrivate.post('/api/parkinglot/search', JSON.stringify({ id, keyword }), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response;
  };

  const debounced = hooks.useDebounce(searchValue, 700);

  const inputRef = useRef();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getMerchantIdByUsername(username);
      return response;
    };
    fetchApi()
      .then((res) => {
        // console.log(res);
        setId(res.data?.object?.id);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!debounced || !id) {
      return;
    }

    setLoading(true);

    const fetchApi = async () => {
      setLoading(true);

      const response = await searchParkingLotByMerchantId(debounced, id);
      setSearchResult(response?.data?.object || []);
      setLoading(false);
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const handleClear = () => {
    setSearchValue('');
    inputRef?.current?.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  // console.log(searchResult);
  return (
    <div className={cx({ [className]: className })}>
      <HeadlessTippy
        visible={showResult && searchResult.length > 0}
        interactive
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Bãi đỗ xe</h4>
              {searchResult.map((result) => (
                <div key={result.id}>{result.parkingLotName}</div>
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={icons.faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={icons.faSpinner} />}
          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default SearchParkingLot;
