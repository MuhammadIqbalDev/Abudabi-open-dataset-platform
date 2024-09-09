import './style.css';
import React, { memo, useEffect, useState } from "react";
import { BiSearch } from 'react-icons/bi';
import { colors } from '../../../utils/colors';
import { useTranslation } from "react-i18next";

const SearchBox = memo((props) => {

    const { title, data, searchValue, setSearchValue } = props;
    const { t, i18n } = useTranslation();

    const [searchVal, setSearchVal] = useState("");

    return (
        <div class="content">
            <div className="search p-2 d-flex align-items-center">
                <BiSearch size={24} color={colors.gray} />
                <input
                    type="text"
                    className="search__input mx-2"
                    aria-label="search"
                    placeholder={`${t("searchBox")} ${title}`}
                    onChange={(e) => setSearchValue({
                        title: e.target.value,
                        type: title
                    })}
                />
            </div>
        </div>
    )
});

export default SearchBox;