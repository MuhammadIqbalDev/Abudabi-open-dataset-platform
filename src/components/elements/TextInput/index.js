import React, { memo, useState } from "react";
import { colors } from "../../../utils/colors";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCallback } from "react";
import './style.css';
import Heading from "../Heading";
import i18n from "../../../i18n/i18n";
import { locales } from "../../../i18n/helper";
import { isDigitExist, isLowerCaseExist, isMaximumLengthExist, isSpecialCharExist, isStrongPassword, isUpperCaseExist, isUsernameExist, validateEmail } from "../../../utils/generic";

const TextInput = memo((props) => {

  const { t } = useTranslation();

  const { placeholder, type, onChange, value, title, index, name, password } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), [showPassword]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordValidationText = [
    i18n.language === locales.AR ? 'تضمين حرف كبير واحد على الأقل' : 'Include at least 1 uppercase letter',
    i18n.language === locales.AR ? "تضمين حرف صغير واحد على الأقل " : 'Include at least 1 lowercase letter',
    i18n.language === locales.AR ? "يجب أن يكون طوله 8 أرقام على الأقل" : 'Must be at least 15 digits long',
    i18n.language === locales.AR ? "تضمين حرف خاص واحد على الأقل (!@#$٪^&*)" : 'Include at least 1 special character (!@#$%^&*)',
    i18n.language === locales.AR ? "يجب أن يكون الحد الأقصى للطول 20 رقما" : 'Maximum length must be 30 digits',
    i18n.language === locales.AR ? "يجب ألا يحتوي على اسم المستخدم أو كلمات القاموس" : 'Must not contain your username or dictionary words'
  ]
  const [onFocusField, setOnFocusField] = useState(false);
  const toggle = useCallback(() => setOnFocusField(!onFocusField));

  const checkEmailValidation = [
    {
      inValid_title: i18n.language === locales.AR ? 'تنسيق بريد إلكتروني غير صالح' : 'Invalid email format',
      valid_title: i18n.language === locales.AR ? 'تنسيق البريد الإلكتروني هذا صالح' : 'This email format is valid',
      isValid: placeholder === t("pwdEmail") && type === "text" && validateEmail(value) === true
    }
  ]

  const checkEqualBothPasswords = [
    {
      inValid_title: i18n.language === locales.AR ? 'كلا كلمتي المرور غير متطابقتين.' : "Both passwords doesn't match.",
      isValid: placeholder === t("rePwd") && type === "rePassword" && password === value
    }
  ]

  // const checkReEmailValidation = [
  //   {
  //     title: i18n.language === locales.AR ? 'لا يتطابق كل من البريد الإلكتروني مع' : 'Both email does not match',
  //   }
  // ]

  const passwordValidationTexts = [
    {
      title: i18n.language === locales.AR ? 'تضمين حرف كبير واحد على الأقل' : 'Include at least 1 uppercase letter',
      isValid: type === "password" && isUpperCaseExist(value) === true
    },
    {
      title: i18n.language === locales.AR ? "تضمين حرف صغير واحد على الأقل " : 'Include at least 1 lowercase letter',
      isValid: type === "password" && isLowerCaseExist(value) === true
    },
    {
      title: i18n.language === locales.AR ? "يجب أن يكون طوله 8 أرقام على الأقل" : 'Must be at least 15 digits long',
      isValid: type === "password" && isDigitExist(value) === true
    },
    {
      title: i18n.language === locales.AR ? "تضمين حرف خاص واحد على الأقل (!@#$٪^&*)" : 'Include at least 1 special character (!@#$%^&*)',
      isValid: type === "password" && isSpecialCharExist(value) === true
    },
    {
      title: i18n.language === locales.AR ? "يجب أن يكون الحد الأقصى للطول 20 رقما" : 'Maximum length must be 30 digits',
      isValid: type === "password" && isMaximumLengthExist(value) === true
    },
    {
      title: i18n.language === locales.AR ? "يجب ألا يحتوي على اسم المستخدم أو كلمات القاموس" : 'Must not contain your username or dictionary words or any empty spaces or must contain one digit number',
      isValid: type === "password" && isStrongPassword(value, name) === true
    }
  ]



  return (
    // <Form.Group
    //   style={{ position: "relative" }}
    //   className="d-flex justify-content-between align-items-center">
    //   <Form.Floating
    //     className="my-2 w-100"
    //     label={placeholder}
    //     style={{ color: colors.gray, fontSize: '13px' }}
    //   >
    //     <Form.Control
    //       className="px-0 m-0 bg-secondary"
    //       id="floatingInputCustom"
    //       type={type}
    //       placeholder={placeholder}
    //       dir="rtl"
    //       onChange={(e) => onChange(e.target.value)}
    //       style={{
    //         border: 0,
    //         borderRadius: 0,
    //         borderBottom: value ? "1.5px solid " + colors.black : "1.5px solid " + colors.light_gray,
    //         boxShadow: "none",
    //         fontSize: '13px',
    //         direction: i18n.language === locales.AR ? "rtl" : "ltr",
    //         margin: 0
    //       }}
    //     /> 
    //     <label className="px-0 pt-4" htmlFor="floatingInputCustom">
    //       <p className="m-0">{placeholder}</p>
    //     </label>
    //   </Form.Floating>
    //   {placeholder === t("password")
    //     &&
    //     <div
    //       className="mx-2 start-0 d-flex justify-content-end align-items-center"
    //       style={{ position: "absolute" }}>
    //       <AiOutlineEye size={18} />
    //     </div>
    //   }
    // </Form.Group>

    <FormControl sx={{ width: '100%' }} variant="standard" className="my-2">
      <InputLabel position="right" htmlFor="standard-adornment-password">{placeholder}</InputLabel>
      <Input
        value={value}
        onFocus={toggle}
        onBlur={toggle}
        id={placeholder}
        sx={{
          ':before': { borderBottomColor: value?.length > 0 ? "black" : '#9F9F9F', borderBottomWidth: "1px" },
          ':after': {
            borderBottomColor:
              placeholder === t("password")
                && type === "password"
                && isMaximumLengthExist(value) === true
                && isStrongPassword(value) === true ? '#2C9C2E'
                : '#AD50F0',
            borderBottomWidth: "1px",
          },
        }}
        type={!showPassword && type === "password" ? "password" : "text"}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={
          <InputAdornment>
            {
              (placeholder === t("password") || placeholder === t("rePwd")) &&
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </IconButton>
            }
          </InputAdornment>
        }
      />
      {onFocusField && placeholder === t("pwdEmail") &&
        title !== t("logIn") &&
        <div className="mt-2">
          {checkEmailValidation?.map(item => <p className="m-0"
            style={{ color: item.isValid ? colors.green : colors.dark_red }}>
            <small>
              {placeholder === t("pwdEmail") && value == ""
                ? null
                : placeholder === t("pwdEmail") && item.isValid === false ?
                  item.inValid_title
                  :
                  item.valid_title}
            </small>
          </p>)}
        </div>
      }

      {onFocusField && placeholder === t("password") &&
        title !== t("logIn") &&
        <div className="mt-3">
          {passwordValidationTexts?.map(item => <p className="m-0"

            style={{ color: item.isValid ? colors.green : colors.gray }}>

            <small>{item.title}</small></p>)}
        </div>
      }

      {
        onFocusField && placeholder === t("rePwd") &&
        title !== t("logIn") &&
        <div className="mt-3">
          {checkEqualBothPasswords?.map(item =>
          (!item.isValid &&
            <p className="m-0"

              style={{ color: colors.gray }}>

              <small>{item.inValid_title}</small></p>
          )
          )}
        </div>
      }

    </FormControl >



  );
});

export default TextInput;
