import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { menuActions } from '../../redux/actions';

const MenuSelector = () => {


  const dispatch = useDispatch();
  const history = useHistory();

  const goToPath = (item) => {
    history.push(item.path);
    dispatch(menuActions.setActiveMenu(item.id));
  };

  // Selecciono los items del menu que solo sean los principales.
  const primaryMenu = useSelector(({ menu }) => menu.items);
  return (
    <div className="menu_selector_container my-3">
      {primaryMenu.map((item) => (
        <div onClick={() => goToPath(item)} className="menu_selector_item mx-3" key={item.path}>
          <i className={`fas text-light fa-3x fa-${item.icon}`}></i>
          <p className="text-light mb-0">{item.name}</p>
        </div>
      ))}

    </div>
  );
};

export default MenuSelector;
