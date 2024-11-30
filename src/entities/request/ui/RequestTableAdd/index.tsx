import React from 'react';
import { DatePicker, Form, Popconfirm, Select } from 'shared/ui';
import { RequestActiveStatus, RequestActiveStatusesList, requestApi } from 'entities/request';
import { FilterOutlined, PlusOutlined } from 'shared/icons';
import {Input} from "antd";
import {InputNumber} from "../../../../shared/ui";

export type FormData = {
  company: string,
  vacancy: string,
  salaryForkStart: number,
  salaryForkEnd: number,
  status: string,
  note: string,
};
const defaultFormState = {};

interface FiltersProps {
  onConfirm: (data: FormData) => void,
  onCancel: () => void,
}

export const Add = ({ onConfirm, onCancel }: FiltersProps) => {

  const [form] = Form.useForm();
  const clearFilters = () => {
    form.setFieldsValue({ ...defaultFormState });
    onCancel();
  };

  return (
    <Popconfirm
      onConfirm={form.submit}
      onCancel={clearFilters}
      title={<div style={{ marginLeft: '-8px' }}>Add Vacancy</div>}
      description={(
        <Form
          form={form}
          onFinish={onConfirm}
          style={{ marginLeft: '-22px', maxWidth: '420px'}}
        >
          <Form.Item label="Company" name="company" rules={[{ required: true, message: 'Please input company!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Vacancy" name="vacancy" rules={[{ required: true, message: 'Please input vacancy!' }]}>
            <Input />
          </Form.Item>
            <Form.Item
                label="Salary Fork Start ($)"
                name="salaryForkStart"
                rules={[{ required: true, message: 'Please input the start salary!' }]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    max={Number.MAX_SAFE_INTEGER}
                    min={0}
                />
            </Form.Item>
            <Form.Item
                label="Salary Fork End ($)"
                name="salaryForkEnd"
                rules={[
                    { required: true, message: 'Please input the end salary!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('salaryForkStart') <= value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('End salary must be greater than start salary!'));
                        },
                    }),
                ]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    max={Number.MAX_SAFE_INTEGER}
                    min={0}
                />
            </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select status!' }]}>
            <Select
                options={RequestActiveStatusesList}
                fieldNames={{ label: 'title' }}
                showSearch
            />
          </Form.Item>
          <Form.Item label="Note" name="note">
            <Input />
          </Form.Item>
        </Form>

      )}
      placement={'topLeft'}
      okText="Save"
      cancelText="Cancel"
      icon={<div />}
    >
      <PlusOutlined
        style={{ fontSize: '18px', color: '#08c', display: 'block' }}
      />
    </Popconfirm>
  );
};
