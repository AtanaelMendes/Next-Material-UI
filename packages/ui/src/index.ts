/**
 * @atanael/ui public entry point.
 *
 * Every export is explicit so bundlers can tree-shake unused components.
 */

// Utilities
export { cn } from './lib/cn';
export { empty, nl2br, numberBetween } from './lib/utils';
export type {
  BaseProps,
  ComponentSize,
  SemanticColor,
  UIOption,
  RequiredFieldErrors,
} from './lib/types';

// Theme
export {
  ThemeProvider,
  ThemeContext,
  ThemeToggle,
  useTheme,
  themeInitScript,
  DEFAULT_THEME_STORAGE_KEY,
} from './providers';
export type {
  Theme,
  ThemeInitOptions,
  ThemeProviderProps,
  ThemeContextValue,
  ThemeToggleProps,
} from './providers';

// Drawer
export {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
  DrawerToggle,
  LeftDrawer,
  RightDrawer,
  DrawerContext,
  useDrawerContext,
  useDrawerState,
  useDrawer,
  useHydratedDrawerState,
  useDrawerAccessibility,
  safeStorage,
  getFocusableElements,
  lockBodyScroll,
  unlockBodyScroll,
  FOCUSABLE_SELECTOR,
} from './components/drawer';
export type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerContentProps,
  DrawerFooterProps,
  DrawerToggleProps,
  LeftDrawerProps,
  LeftDrawerNavItem,
  RightDrawerProps,
  DrawerContextValue,
  DrawerStateApi,
  DrawerVariant,
  UseDrawerStateOptions,
  UseDrawerAccessibilityOptions,
} from './components/drawer';

// Buttons
export {
  Button,
  generateButtonClass,
  ButtonGroup,
  ButtonDropDown,
  ButtonRadioGroup,
  ButtonToggle,
  FabAdd,
  FabCancel,
  FabCustom,
  FabSave,
  PillsBadge,
} from './components/buttons';
export type {
  ButtonProps,
  ButtonGroupProps,
  ButtonGroupItem,
  ButtonDropDownProps,
  DropdownItem,
  ButtonRadioGroupProps,
  ButtonRadioOption,
  ButtonToggleProps,
  FabAddProps,
  FabBaseProps,
  FabCustomProps,
  PillsBadgeProps,
  PillsBadgeType,
} from './components/buttons';

// Inputs
export {
  InputText,
  applyMask,
  InputTextArea,
  InputPassword,
  InputEmail,
  InputNumber,
  InputDate,
  InputMonth,
  InputFile,
  DatePicker,
  TimePicker,
  DataHora,
  Checkbox,
  Radio,
  RadioGroup,
  Fieldset,
  ProgressBar,
  RangeSlider,
  CustomDropdown,
  Select,
  Combobox,
  RichText,
} from './components/inputs';
export type {
  InputTextProps,
  InputTextMask,
  InputTextAreaProps,
  InputPasswordProps,
  InputEmailProps,
  InputNumberProps,
  InputDateProps,
  InputDateVariant,
  InputMonthProps,
  InputFileProps,
  DatePickerProps,
  TimePickerProps,
  DataHoraProps,
  CheckboxProps,
  RadioProps,
  RadioGroupProps,
  RadioGroupItem,
  FieldsetProps,
  ProgressBarProps,
  RangeSliderProps,
  CustomDropdownProps,
  CustomDropdownOption,
  SelectProps,
  ComboboxProps,
  RichTextProps,
} from './components/inputs';

// Display
export {
  Title,
  Subtitle,
  Label,
  Caption,
  FieldLabel,
  Accordion,
  Blockquote,
  NewBadge,
  Timeline,
  Clipboard,
  Iframe,
} from './components/display';
export type {
  TypographyProps,
  FieldLabelProps,
  AccordionProps,
  AccordionItemData,
  BlockquoteProps,
  BlockquoteType,
  BlockquoteSize,
  NewBadgeProps,
  TimelineProps,
  TimelineRow,
  ClipboardProps,
  IframeProps,
} from './components/display';

// Feedback
export {
  DataLoading,
  Failure,
  Loading,
  NoDataFound,
  SmallLoading,
  Skeleton,
  FormSkeleton,
  SkeletonList,
  WarningMessage,
} from './components/feedback';
export type {
  DataLoadingProps,
  FailureProps,
  LoadingProps,
  NoDataFoundProps,
  SmallLoadingProps,
  SkeletonProps,
  SkeletonListProps,
  SkeletonListVariant,
  WarningMessageProps,
} from './components/feedback';

// Overlays
export {
  TooltipComponent,
  Balloon,
  Confirm,
  Dialog,
  DialogFields,
  ModalGrid,
  TimelineModal,
} from './components/overlays';
export type {
  TooltipComponentProps,
  TooltipSide,
  BalloonProps,
  BalloonPlacement,
  BalloonColor,
  ConfirmProps,
  DialogProps,
  DialogFieldsProps,
  ModalGridProps,
  ModalSize,
  TimelineModalProps,
} from './components/overlays';

// Navigation
export { Pagination, SortControl, PageTabs } from './components/navigation';
export type {
  PaginationProps,
  PaginationSize,
  SortControlProps,
  SortOption,
  PageTabsProps,
  PageTab,
} from './components/navigation';

// Tables
export { DataTable } from './components/tables';
export type { DataTableProps, DataTableHeader, DataTableAlign } from './components/tables';

// Charts
export { PieChart, AnswersChart, UserHoursBarChart } from './components/charts';
export type {
  PieChartProps,
  PieChartDatum,
  AnswersChartProps,
  AnswersChartDatum,
  UserHoursBarChartProps,
  UserHoursDatum,
} from './components/charts';

// Cards
export { Card, CardActions, CardBody, CardImage, CardTitle } from './components/cards';
export type {
  CardProps,
  CardActionsProps,
  CardTitleProps,
  CardImageProps,
  CardAlign,
  CardColor,
} from './components/cards';
