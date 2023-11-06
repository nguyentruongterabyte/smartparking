/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MultiSelect } from 'react-multi-select-component';

import hooks from '~/hooks';
import styles from './Search.module.scss';
import icons from '~/assets/icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import config from '~/config';
import { SearchIcon } from '~/components/Icons';
import ParkingLotResult from './ParkingLotResult';

const cx = classNames.bind(styles);

export function SearchParkingLot({ className }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const axiosPrivate = hooks.useAxiosPrivate();
  const [vehicleIds, setVehicleIds] = useState([]);
  const currentDate = new Date();

  const searchParkingLot = async (keyword, vehicleTypeId) => {
    const response = await axiosPrivate.post(
      config.constants.SEARCH_PARKING_LOTS_URL,
      JSON.stringify({ keyword, vehicleTypeId }),
    );
    return response;
  };

  const debounced = hooks.useDebounce(searchValue, 700);

  const inputRef = useRef();

  useEffect(() => {
    // fetch vehicle types
    const response = axiosPrivate.get(config.constants.VEHICLE_TYPES_URL);
    response
      .then((res) => {
        const vs = res?.data?.object.map((v) => ({ label: v.typeName, value: v.id }));
        setVehicleTypes(vs);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!debounced) {
      return;
    }

    setLoading(true);

    const fetchApi = async () => {
      setLoading(true);
      // Get all parking lot with all vehicles if user not chosen
      if (vehicleIds.length === 0) {
        const promises = await vehicleTypes.map((vehicleId) => searchParkingLot(debounced, vehicleId.value));

        Promise.all(promises).then((results) => {
          let combinedResults = [];
          for (let i = 0; i < results.length; i++) {
            const result = results[i]?.data?.object || [];
            combinedResults = combinedResults.concat(result);
          }

          combinedResults = combinedResults.filter(
            (value, index, self) => index === self.findIndex((t) => t.id === value.id),
          );
          setSearchResult(combinedResults);
        });
      } else {
        const promises = await vehicleIds.map((vehicleId) => searchParkingLot(debounced, vehicleId.value));

        Promise.all(promises).then((results) => {
          let combinedResults = results[0]?.data?.object || [];

          for (let i = 0; i < results.length; i++) {
            const result = results[i]?.data?.object || [];
            combinedResults = combinedResults.filter((t) => result.some((e) => e.id === t.id));
          }
          combinedResults = combinedResults.filter(
            (value, index, self) => index === self.findIndex((t) => t.id === value.id),
          );

          setSearchResult(combinedResults);
        });
      }

      setLoading(false);
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    // console.log(searchResult);
  }, [searchResult]);

  useEffect(() => {
    setSearchResult([]);
  }, [vehicleIds]);

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
        placement="bottom-start"
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Bãi đỗ xe</h4>
              {searchResult.map((result) => (
                <ParkingLotResult
                  key={result.id}
                  totalCurrentTime={currentDate.getHours() * 60 + currentDate.getMinutes()}
                  data={result}
                />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div style={{ marginTop: '38px' }}>
          <div className={cx('search-on-mobile-tablet', 'search')}>
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
          <MultiSelect
            hasSelectAll={false}
            disableSearch
            options={vehicleTypes}
            value={vehicleIds}
            onChange={setVehicleIds}
          />
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
  const username = hooks.useLocalStorage('user', '')[0];
  const debounced = hooks.useDebounce(searchValue, 700);

  const getMerchantIdByUsername = async (username) => {
    const response = await axiosPrivate.post(config.constants.MERCHANT_INFO_URL, JSON.stringify({ username }), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response;
  };

  const searchParkingLotByMerchantId = async (keyword, id) => {
    const response = await axiosPrivate.post(
      config.constants.SEARCH_PARKING_LOTS_BY_MERCHANT_URL,
      JSON.stringify({ id, keyword }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    return response;
  };

  const inputRef = useRef();

  useEffect(() => {
    if (!id) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!debounced || !id) {
      // setUsername('');
      // toast.error('Lỗi tìm kiếm!');
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

  return (
    <div className={cx({ [className]: className })}>
      <HeadlessTippy
        visible={showResult && searchResult.length > 0}
        interactive
        placement="bottom-start"
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Bãi đỗ xe</h4>
              {searchResult.map((result) => {
                return <ParkingLotResult key={result.id} data={result} />;
              })}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search-on-mobile-tablet', 'search')}>
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
