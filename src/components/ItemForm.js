import React from 'react';
import {useFormik} from 'formik';
import {TextField} from './TextField';
import * as Yup from 'yup';
import {useItems} from "../contexts/ItemsContext";

const validate = Yup.object({
    name: Yup.string().required('Required'),
    status: Yup.mixed().oneOf(['active', 'inactive']).required('Required'),
    description: Yup.string().required('Required'),
})

export const ItemForm = ({togglePane,item, isAdd}) => {
    const {addItem, updateItem} = useItems();

    const onSubmit = (values) => {
        if (isAdd) {
            addItem(values);
            togglePane();
        } else {
            updateItem(item._id, values);
            togglePane();
        }
    };

    const formik = useFormik({
        initialValues: {
            name: item.name ?? '',
            status: item.status ?? '',
            description: item.description ?? '',
        },
        validationSchema: validate,
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                label="Name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && formik.errors.name}
            />
            <TextField
                label="Status"
                name="status"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.status}
                error={formik.touched.status && formik.errors.status}
            />
            <TextField
                label="Description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.touched.description && formik.errors.description}
            />
            <button className="btn btn-sm btn-primary" type="submit">{isAdd ? 'Add' : 'Update'}</button>
        </form>
    )
}
